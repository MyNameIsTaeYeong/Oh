import User from "../models/User";
import Memo from "../models/Memo";

export const postAddMemo = async (req, res) => {
    const {
        body: { memoContent },
        params: { id },
        user: { email }
    } = req;

    try {
        const user = await User.findById(id);

        const newMemo = await Memo.create({
            content: memoContent,
            createdBy: email
        });
        
        let memosArray = user.memos.get("20210129");

        console.log(memosArray);

        if(memosArray === undefined){
            memosArray = []; 
             
        } else {
            user.memos.delete("20210129");
        }
        
        memosArray.push(newMemo._id);
        user.memos.set("20210129", memosArray); 
        

        user.save();

    } catch (error) {
        //res.status(400);
        console.log(error);
    }finally{
        res.end();
    }
    
}