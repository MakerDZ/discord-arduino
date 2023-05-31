import { QuickDB } from 'quick.db'


class Db{
    private db;
    constructor(){
        this.db = new QuickDB()
    }
    public addData(data_name : string , actual_data : any){
        const data = this.db.set(data_name, actual_data);
        return data;
    }
    public getData(data_name : string){
        const data = this.db.get(data_name);
        return data;
    }
    public deleteData(data_name : string){
        const data = this.db.delete(data_name);
    }
    public pushData(data_name : string, new_data : any){
        const data = this.db.push(data_name, new_data);
        return data;
    }
    public removeData(data_name : string , new_data : any){
        const data = this.db.pull(data_name, new_data);
        return data;
    }
    public dataCreated(data_name : string){
        const data = this.db.has(data_name);
        return data;
    }
}

const db = new Db();
export default db;