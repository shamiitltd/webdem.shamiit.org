from django.shortcuts import render
from .forms import UploadFileForm
from .models import ImportedData
import pandas as pd

def upload_file(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            df = pd.read_excel(file)
            headers = df.columns.tolist()
            data = df.values.tolist()

            # Save data to database
            for row in data:
                ImportedData.objects.create(
                    name=row[0],
                    email=row[1],
                    position=row[2],
                    mobile=row[3]
                )

            # Retrieve data from the database
            imported_data = ImportedData.objects.all()

            return render(request, 'imported_table.html', {'headers': headers, 'data': imported_data})
    else:
        form = UploadFileForm()
    return render(request, 'upload_file.html', {'form': form})
