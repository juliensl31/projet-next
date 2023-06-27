// Librairies
import { getSession } from 'next-auth/react';
import { connectDatabase } from '@/helpers/mongodb';

export async function handler(req, res) {
  if (req.method === 'DELETE') {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: 'Non authentifié' });
      return;
    }

    // Connexion à MongoDB
    let clientMongoDB;
    try {
      clientMongoDB = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: 'Connexion à la base de données impossible',
      });
      return;
    }

    const db = clientMongoDB.db();

    // Suppression de l'utilisateur
    try {
      await db.collection('utilisateurs').deleteOne({
        email: session.user.email,
      });
    } catch (error) {
      res.status(500).json({ message: 'Suppression impossible' });
      clientMongoDB.close();
      return;
    }

    // Succès
    res.status(200).json({ message: 'Utilisateur supprimé' });
    return;
  } else {
    res.status(403).json({ message: 'Votre requête est invalide' });
    return;
  }
}
