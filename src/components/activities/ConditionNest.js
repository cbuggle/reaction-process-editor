class ConditionNest {
  constructor(parentCondition, id) {
    this.id = id;
    this.parentCondition = parentCondition;
    this.nestedConditions = [];
  }
  nestCondition(condition) {
    this.nestedConditions.push(condition);
  }
  getConditionLevel(){
    return(this.nestedConditions.length)
  }
};

export default ConditionNest;

