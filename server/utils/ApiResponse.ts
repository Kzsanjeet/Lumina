

class ApiResponse{
    public success:Boolean
    constructor(public status:number, public message:String, public data:Object){
        this.status = status;
        this.message = message;
        this.data = data;

        if(this.status>=400 && this.status<200){
            this.success= true
        }else[
            this.success= false
        ]
    }
}


export default ApiResponse



// const test = new ApiResponse(200, "fdfdf", {name:"dfd"})