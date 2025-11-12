function extractProjectIdAndFileName(url) {
    const parts = url.split('/');
    const fileName = parts.slice(1).join('/');
  
    return fileName;
}

const myString1 = "projects/b8q60i9o/VillageMD_AgencyBackground_Final.pdf_images/dc863296-b637-41c7-b1ba-90a787391d81-01.jpg";

console.log(extractProjectIdAndFileName(myString1)); 
