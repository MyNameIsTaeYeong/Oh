import User from "../models/User";
import Pattern from "../models/Pattern";


/*
    패턴삭제 순서
    1. 유저의 patternsMap에서 해당 패턴의 index 지우기
    2. 유저의 patterns에서 해당 패턴의 index 지우기
    -> 저절로 index가 하나씩 당겨진다. (string배열, 맵에서 그렇게 되는지 확인필요.)
*/

/*
    패턴기록 순서
    1. 해당 패턴 find
    2. 해당날짜에 대한 패턴맵 기록 
    3. 해당 날짜에서 연관된 패턴 기록
    4. 연관된 패턴들에 대해서도 발생한패턴 기록
*/
export const postRecordPattern = async (req, res) => {
    const {
        params: { id, day },
        body: { patternIndexAndValue }
    } = req;

    // values[0] : 패턴index, values[1] : 패턴값
    const values = patternIndexAndValue.split(",");
    const indexOfPattern = values[0];
    const valueOfPattern = values[1];

    try {
        // 1. 해당 패턴 find
        const user = await User.findById(id);
        const patternId = user.patterns[indexOfPattern];
        const pattern = await Pattern.findById(patternId);

        // 2. 해당날짜에 대한 패턴맵 기록
        let patternOfTheDay = user.patternsMap.get(day); 

        if(patternOfTheDay === undefined){
            const patternsValue = [];
            patternsValue[indexOfPattern] = valueOfPattern;
            patternOfTheDay = {
                patternsValue
            };
        }
        else {
            patternOfTheDay.patternsValue[indexOfPattern] = valueOfPattern;
        }

        user.patternsMap.set(day, patternOfTheDay);
        user.save();

        /*
            3. 해당 날짜에서 연관된 패턴 기록
            
            - 패턴맵안에 있는 패턴값배열을 이용하여 기록한 패턴 이외의 값들을 알아낸다.
        */

        console.log(pattern);

        // 4. 연관된 패턴들에 대해서도 발생한패턴 기록

        if(valueOfPattern === "good"){
            //pattern.theDayGoodOccurred.push(day);

        } 
        else if(valueOfPattern === "avg"){

        } 
        else if(valueOfPattern === "bad"){

        }   


    } catch (error) {
        console.log(error);
    }finally{
        res.end();
    }
}

export const postCreatePattern = async (req, res) => {
    const { 
        params: { id },
        body: { patternName }
    } = req;

    try {
        const user = await User.findById(id);
        const pattern = await Pattern.create({
            name: patternName,
            createdBy: user.email
        });
        user.patterns.push(pattern);
        user.save();
        res.send({btnId: user.patterns.length-1});
    } catch (error) {
        console.log(error)
    } finally {
        res.end();
    }

}