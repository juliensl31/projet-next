// Librairies
import { connectDatabase } from '@/helpers/mongodb';
import NextAuth from 'next-auth/next';
import { getServerSession } from 'next-auth/next';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, NextAuth);

    if (!session) {
      res.status(401).json({
        message: 'Impossible de vous authentifier',
      });
      return;
    }

    // Connexion à MongoDB
    let clientMongoDB;
    try {
      clientMongoDB = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: 'Impossible de se connecter',
      });
      return;
    }

    const db = clientMongoDB.db();

    // Supprimer l'utilisateur connecté
    try {
      await db.collection('utilisateurs').deleteOne({
        email: session.user.email,
      });
    } catch (error) {
      clientMongoDB.close();
      res.status(501).json({
        message: 'Impossible de supprimer cet utilisateur',
      });
      return;
    }

    // Succès
    res.status(200).json({
      message: 'Utilisateur supprimé avec succès',
    });
    return;
  } else {
    res.status(403).json({
      message: 'Votre requête est invalide',
    });
    return;
  }
}
