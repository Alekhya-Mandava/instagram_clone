export const uploadMediaToCloudinary = async (media) => {
    if (media) {
      const data = new FormData();
      data.append("file", media);
      data.append("resource_type", "video");
      data.append("upload_preset", "instagram_clone");
      data.append("cloud_name", "dtjy0kci5");
  
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dtjy0kci5/video/upload",
        {
          method: "post",
          body: data,
        }
      );
      const fileData = await res.json();
      console.log("url : ", fileData);
      return fileData.url.toString();
    } else {
      console.log("error");
    }
  };
  