import os
import shutil

folder_path=r"copy the path of the folder that u want to sort "# here we copied the whole path of the folder 

a=os.listdir(folder_path)# this helps us to get both the folders as well as files inside it as it is a library
for i in a:
    whole_path=os.path.join(folder_path,i)
    if os.path.isfile(whole_path): # check weather it is a file or not 
        print(i," Its file")
    else:
        print(i,"Error")
for i in a:
    name,ext=os.path.splitext(i) # this library is used for spliting the file name and the extension just to know 
    
    # now lets prepare the dictornary 
    file_types = {
    "Images": [".jpg", ".jpeg", ".png"],
    "Documents": [".pdf", ".docx", ".txt"],
    "Audio": [".mp3", ".wav"],
    "Archives": [".zip", ".rar"],
    "python":[".py"],
    "vedio":[".mp4"]
    }
    for key,value in file_types.items():#here we use items because .items() as it is a in_built library we give both key value pairs at a time 
       if ext.lower() in value:
        print(f"{i} belongs to {key}")

        whole_path=os.path.join(folder_path,i)
        seperate_folder=os.path.join(folder_path,key)  
        if not os.path.exists(seperate_folder): 
            os.makedirs(seperate_folder) #it helps to create the seperate folders if not present 

        shutil.move(whole_path,seperate_folder) 
