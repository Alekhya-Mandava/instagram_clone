

export const uploadToCloudinary = async (pics) => {
  if (pics) {
    
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "instagram_clone");
    data.append("cloud_name", "dtjy0kci5");

    const res = await fetch("https://api.cloudinary.com/v1_1/dtjy0kci5/image/upload", {
      method: "post",
      body: data,
    })
      
      const fileData=await res.json();
      console.log("url : ", fileData);
      return fileData.url.toString();

  } else {
    console.log("error");
  }
};


