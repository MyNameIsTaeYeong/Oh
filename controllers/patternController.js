import User from "../models/User";
import Pattern from "../models/Pattern";
import RelatedPattern from "../models/RelatedPattern";

/*
    패턴삭제 순서
    1. 유저의 patternsMap에서 해당 패턴의 index 지우기
    2. 유저의 patterns에서 해당 패턴의 index 지우기
    -> 저절로 index가 하나씩 당겨진다. (string배열, 맵에서 그렇게 되는지 확인필요.)
*/

/*
    패턴기록 순서
    1. 해당 패턴 find
    2. 해당날짜에 대한 패턴맵 기록. 예) "20210303" : { patternsValue : ["good", null, null, "bad", ...] }
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
    const indexOfPattern = parseInt(values[0]);
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

        // 예) patternsValue : ["good", null, null, "bad", ...]
        const patternsValue = patternOfTheDay.patternsValue;
        let indexOfPatternsAssociatedWithValues;
        
        switch (valueOfPattern) {
            case "good":
                indexOfPatternsAssociatedWithValues = 0;
                break;
            case "avg":
                indexOfPatternsAssociatedWithValues = 1;
                break;
            case "bad":
                indexOfPatternsAssociatedWithValues = 2;
                break;
            default:
                console.log("It shouldn't be print out");
                break;
        }

        const relatedPatternId = pattern.patternsAssociatedWithValues[indexOfPatternsAssociatedWithValues];
        
        

        const relatedPattern = await RelatedPattern.findById(relatedPatternId);
        
        /* 
            relatedPatterns : 맵을 저장하는 배열
            예) 

            [ 
                {
                    "good" : 7,
                    "avg" : 1,
                    "bad" : 3
                }, ... 
            ]
            
        */ 
        const relatedPatterns = relatedPattern.relatedPatterns;

        console.log(patternsValue);

        // patternsValue에 있는 값들을 기록.
        for(let i=0; i<patternsValue.length; i++){
            if(patternsValue[i] === null || patternsValue[i] === undefined) {
                continue;
            }
            
            if(i === indexOfPattern){
                continue;
            }
            if(relatedPatterns[i] === undefined || relatedPatterns[i] === null){
                let myMap = new Map();
                myMap.set("good", 0);
                myMap.set("avg", 0);
                myMap.set("bad", 0);
                // 터지는 부분
                relatedPatterns[i] = myMap;
            }


            
        }
        
        relatedPattern.save();


        console.log(relatedPattern);

        // 4. 연관된 패턴들에 대해서도 발생한패턴 기록

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

        for(let i=0; i<3; i++){
            const relatedPattern = await RelatedPattern.create({});
            pattern.patternsAssociatedWithValues.push(relatedPattern);
        }
        pattern.save();
        user.patterns.push(pattern);
        user.save();
        res.send({btnId: user.patterns.length-1});
    } catch (error) {
        console.log(error)
    } finally {
        res.end();
    }

}