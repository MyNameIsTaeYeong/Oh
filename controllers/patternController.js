import User from "../models/User";
import Pattern from "../models/Pattern";

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
    } catch (error) {
        console.log(error)
    } finally {
        res.end();
    }

}