// Librairies
import { hashPassword } from '@/helpers/auth';
import { connectDatabase } from '@/helpers/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { pseudo, email } = req.body;
    let { password } = req.body;

    // 1er etape : vérifier que tous les champs sont renseignés
    if (!pseudo || !email || !password) {
      res
        .status(422)
        .json({ message: 'Un ou plusieurs champs sont manquants' });
      return;
    }

    // Etape intermédiaire : securiser le mot de passe
    password = await hashPassword(password);

    // 2eme etape : Stocker le nouvel utilisateur dans la base de données
    const nouvelUtilisateur = {
      pseudo,
      email,
      password,
      roles: ['utilisateur'],
    };

    // 3eme etape : Vérifier la syntaxe l'email est valide
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
      res.status(406).json({ message: "L'email n'est pas valide." });
      return;
    }

    // connexion à MongoDB
    let clientMongoDB;
    try {
      clientMongoDB = await connectDatabase();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Impossible d'effectuer la requête." });
      return;
    }

    const db = clientMongoDB.db();
    let emailExisteDeja;

    // 4eme etape : Vérifier que l'email n'existe pas déjà
    try {
      emailExisteDeja = await db
        .collection('utilisateurs')
        .findOne({ email: email });
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({ message: 'un problème est survenu.' });
      return;
    }

    // Si l'email existe déjà, on renvoie une erreur
    if (emailExisteDeja) {
      clientMongoDB.close();
      res.status(403).json({ message: "L'email existe déjà." });
      return;
    }

    // 5eme etape : Insérer le nouvel utilisateur dans la base de données
    try {
      await db
        .collection('utilisateurs')
        .insertOne(nouvelUtilisateur);
    } catch (error) {
      clientMongoDB.close();
      res.status(500).json({ message: 'un problème est survenu.' });
      return;
    }

    // Succès
    clientMongoDB.close();
    res.status(201).json({
      message: 'Utilisateur créé.',
      utilisateur: nouvelUtilisateur,
    });
  } else {
    res.status(405).json({ message: 'Une erreur est survenue' });
  }
}
