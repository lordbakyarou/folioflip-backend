class CURDRepository {
  constructor(model) {
    this.model = model;
  }

  async create(userData) {
    try {
      const newDoc = this.model(userData);
      const data = await newDoc.save();
      return data;
    } catch (error) {
      console.log(error.message, "createErrorblabla");
      throw error;
    }
  }

  async insertMany(documentArray) {
    try {
      const newDoc = await this.model.insertMany(documentArray);
      return newDoc;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(filter, updateData, options = { new: true }) {
    try {
      const updatedData = await this.model.findOneAndUpdate(
        filter,
        updateData,
        options
      );
      return updatedData;
    } catch (error) {
      throw error;
    }
  }

  async findById(id, getPassword) {
    try {
      const data = await this.model
        .findById(id)
        .select(getPassword && "+password");

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(query = {}, options = {}, getPassword) {
    try {
      const data = await this.model
        .findOne(query, null, options)
        .select(getPassword && "+password");
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CURDRepository;
