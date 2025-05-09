import { queryDB } from "@/utils/api";

export default async function handler(req, res) {
  try {
    const directors = await queryDB('directors', 'find', {});
    
    res.status(200).json({
      success: true,
      directors: directors.map(director => ({
        id: director.id,
        name: director.name,
        biography: director.biography
      }))
    });

  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}