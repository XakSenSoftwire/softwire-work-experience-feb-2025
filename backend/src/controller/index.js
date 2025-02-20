import sql from '../../services/postgres.js';

export const someAction = async (res, parameters) => {
    await sql`INSERT INTO tetris_scores (player_name, score) VALUES ('foo', 100)`;
    const data = await sql`SELECT * FROM tetris_scores`;
    
    return  res.status(200).json({
        status: 200,
        message: 'This is an example',
        data: data
    })
}

export const getScores = async (res, parameters) => {
    const data = await sql`SELECT * FROM public.tetris_scores ORDER BY score DESC`;
    
    return  res.status(200).json({
        status: 200,
        message: 'Exporting scores in descending order',
        data: data
    })
}