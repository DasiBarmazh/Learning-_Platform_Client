export const fetchData= async ()=>{
    return new Promise(async(resolve) => {
       const response= await fetch('http://localhost:5282/api/User/login') ;
       const result =await response.json();
       resolve(result.products);
    });
}