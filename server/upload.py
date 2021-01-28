from google.cloud import storage

class uploader:
    def __init__(self, config):
    # urllib.request.urlretrieve("https://github.com/ultralytics/yolov5/releases/download/v3.1/yolov5s.pt", "yolov5s.pt")
        pass

    def upload_blob(bucket_name, source_file_name, destination_blob_name):
        """Uploads a file to the bucket."""
        # bucket_name = "your-bucket-name"
        # source_file_name = "local/path/to/file"
        # destination_blob_name = "storage-object-name"

        storage_client = storage.Client()
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(destination_blob_name)

        blob.upload_from_filename(source_file_name)

        print(
            "File {} uploaded to {}.".format(
                source_file_name, destination_blob_name
            )
        )