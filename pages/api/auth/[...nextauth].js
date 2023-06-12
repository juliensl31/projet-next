// Librairies
import NextAuth from 'next-auth';
import Provider from 'next-auth/providers';
import { connectToDatabase } from '@/helpers/mongodb';
import { verifyPassword } from '@/helpers/auth';

export default NextAuth({
  providers: [
    Provider.Credentials({
      async authorize(credentials) {
        // Email & Password
        const { email, password } = credentials;

        // Connexion à MongoDB
        const clientMongoDb = await connectToDatabase();

        // Recherche de l'utilisateur
        const utilisateur = await clientMongoDb
          .db()
          .collection('utilisateurs')
          .findOne({ email: email });

        if (!utilisateur) {
          clientMongoDb.close();
          throw new Error('Impossible de vous authentifier.');
        }

        // Vérification du mot de passe
        const isValid = await verifyPassword(
          password,
          utilisateur.password
        );

        if (!isValid) {
          clientMongoDb.close();
          throw new Error('Impossible de vous authentifier.');
        }

        // Succès
        clientMongoDb.close();
        return {
          email: utilisateur.email,
          pseudo: utilisateur.pseudo,
        };
      },
    }),
  ],
});
