import User from "../models/User";
import Memo from "../models/Memo";


// toDo : 클릭한 날짜를 키값으로 메모 등록하기.
export const postAddMemo = async (req, res) => {
    const {
        body: { memoContent },
        params: { id, day },
        user: { email }
    } = req;

    try {
        const user = await User.findById(id);
        const memoOfTheDay = user.memosMap.get(day);
 
        if(memoOfTheDay === undefined){
            const newMemo = await Memo.create({
                content: [memoContent],
                createdBy: email
            });
            user.memosMap.set(day, newMemo); 
            res.send({btnId:0});
        } else {
            const memos = await Memo.findById(memoOfTheDay._id);
            memos.content.push(memoContent);
            memos.save();
            res.send({btnId:memos.content.length-1});
        }
        
        user.save();
        //res.send({user});
    } catch (error) {
        res.status(400);
        console.log(error);
    }finally{
        console.log("END!!!");
        res.end();
    }
    
}

export const postViewMemo = async (req, res) => {
    const {
        params: {id, day}
    } = req;

    try {
        const user = await User.findById(id);
        const memoOfTheDay = user.memosMap.get(day);
       
        if(memoOfTheDay !== undefined){
            const memos = await Memo.findById(memoOfTheDay._id);
            res.send({memos});
        } else {
            res.send({memos: null});
        }

    } catch (error) {
        res.status(400);
        console.log(error);
    } finally{
        res.end();
    }

    
}

export const postDeleteMemo = async (req, res) => {
    const {
        params: {id, day, idx}
    } = req;

    console.log(id, day, idx);
    try {
        const user = await User.findById(id);
        const memoOfTheDay = user.memosMap.get(day);
        const memos = await Memo.findById(memoOfTheDay._id);
       
        memos.content.splice(idx, 1);
        memos.save();

        res.send({memos});

    } catch (error) {
        res.status(400);
        console.log(error);
    } finally {
        res.end();
    }
}