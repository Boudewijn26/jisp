const builtIns = {
  def([definitionName, operation], scope) {
    const result = executeCommand(operation, scope);
    scope[definitionName] = result;
  } 
}

function get(name, scope) {
  return scope[name] || builtIns[name];
}

function executeCommand(command, scope) {
  if (command instanceof Array) {
    const [operation, ...args] = command;
    get(operation, scope)(args, scope);
  } else {
    return command;
  }
};

module.exports = {
  execute(commands) {
    const scope = {};
    commands.forEach((command) => executeCommand(command, scope));
    return scope.result;
  }
};
