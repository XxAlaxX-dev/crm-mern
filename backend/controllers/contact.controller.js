const Contact = require('../models/contact.model');

// Créer un contact
exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({
      success: true,
      msg: "Contact created successfully",
      contact,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les contacts avec filtrage avancé
exports.getAllContacts = async (req, res) => {
  try {
    const { name, email, createdBy } = req.query;
    let filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' }; // Recherche insensible à la casse
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (createdBy) filter.createdBy = createdBy;

    const contacts = await Contact.find(filter).populate('createdBy', 'name email');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un contact par ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).populate('createdBy', 'name email');
    if (!contact) {
      return res.status(404).json({ error: 'Contact non trouvé' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un contact par ID
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) {
      return res.status(404).json({ error: 'Contact non trouvé' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un contact par ID
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact non trouvé' });
    }
    res.status(200).json({ message: 'Contact supprimé avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
