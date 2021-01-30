import User from "../models/User";
import Memo from "../models/Memo";

// toDo : 클릭한 날짜를 키값으로 메모 등록하기.
export const postAddMemo = async (req, res) => {
    const {
        body: { memoContent },
        params: { id },
        user: { email }
    } = req;

    try {
        const user = await User.findById(id);

       
        
        let memos = user.memosMap.get("20210129");

       
        
        if(memos === undefined){
            const newMemo = await Memo.create({
                content: [memoContent],
                createdBy: email
            });
            user.memosMap.set("20210129", newMemo); 
        } else {
            const memo = await Memo.findById(memos._id);
            memo.content.push(memoContent);
            memo.save();

            console.log(memo);
        }
        
        user.save();

    } catch (error) {
        //res.status(400);
        console.log(error);
    }finally{
        res.end();
    }
    
}