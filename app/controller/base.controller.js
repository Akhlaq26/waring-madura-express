class BaseController {
  async getAll(req, res, relations = null, filters = {}) {
    try {
      const model = this.constructor.model;
      let query = model.query();
      if (relations) {
        query.withGraphFetched(relations);
      }
      
      if (filters) {
        query = query.where(filters);
      }

      const items = await query;
      res.status(200).json({
        status: 200,
        message: "Success",
        data: items,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async insert(req, res) {
    try {
      const model = this.constructor.model;
      const data = { ...req.body };
      const item = await model.query().insert(data);
      res.status(200).json({
        status: 200,
        message: "Success insert",
        data: item,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async get(req, res, relations = null, filters = {}) {
    try {
      const model = this.constructor.model;
      let query = model.query().findById(req.params.id);

      if (relations) {
        query.withGraphFetched(relations);
      }

      if (filters) {
        query = query.where(filters);
      }
      
      const item = await query;
      if (!item) {
        return res.status(404).json({
          status: 404,
          message: "Not Found",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Success",
        data: item,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const model = this.constructor.model;
      const data = { ...req.body };
      const item = await model.query()
        .findById(req.params.id)
        .patch(data);
      res.status(200).json({
        status: 200,
        message: "Success update",
        data: item,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const model = this.constructor.model;
      const item = await model.query().deleteById(req.params.id);
      res.status(200).json({
        status: 200,
        message: "Success delete",
        data: item,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async associateBatch(req, res, id, relatedTable, relatedField, relationIds) {
    try {
      const model = this.constructor.model;
      await model.knex().transaction(async trx => {
        for (const relationId of relationIds) {
        // check existing relation
          const existingRelation = await model.relatedQuery(relatedTable)
          .for(id)
          .where(relatedField, relationId)
          .first()
          .transacting(trx);

        // If the relation doesn't exist, create it
        if (!existingRelation) {
          await model.relatedQuery(relatedTable)
            .for(id)
            .relate(relationId)
            .transacting(trx);
        }
        }
      });
      
      res.status(200).json({
        status: 200,
        message: "Success",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

}

module.exports = BaseController;
