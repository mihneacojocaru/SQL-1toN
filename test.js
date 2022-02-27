function asyncHandler(callBack){
    return async (req,res,next) => {
        try {
            await callBack(req,res,next);

        } catch (error) {
            next(error);
        }
    }
}

asyncHandler( async(req,res,next) => {
    const results = await sequelize.query(`select * from Posts where userId = ${user}`,
        {
           nest: true,
           type: QueryTypes.SELECT
        });
    if(results.length == 0) throw new Error(`User id doesn't exist.`);
    return res.status(200).json(results);
});