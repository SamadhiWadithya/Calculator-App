//IM/2021/063

export const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
  previousExpression: "",
  error: false, // error state
};



const handleNumber = (value, state) => {
  if (state.error) {
    return { currentValue: `${value}`, error: false };
  }

  // Allow only up to 9 decimal places
  if (value === "." && (state.currentValue.split(".")[1] || "").length >= 9) {
    return state; // Prevent entering more than 9 decimal places
  }

  // Allow only one decimal point in the current value
  if (value === "." && state.currentValue.includes(".")) {
    return state; // Do nothing if there's already a decimal point
  }

  if (state.currentValue === "0" || state.error) {
    return { currentValue: `${value}`, error: false };
  }

  return {
    currentValue: `${state.currentValue}${value}`,
    error: false,
  };
};



const handleEqual = (state) => {
  const { previousExpression, currentValue } = state;

  // Build full expression
  const fullExpression = `${previousExpression} ${currentValue}`;

  try {
    const parts = fullExpression.split(" ");
    if (parts.length === 3 && parts[1] === "/" && parts[2] === "0") {
      throw new Error("Division by zero");
    }

    const result = eval(fullExpression); // eval here is simplified, use math.js for production environments

    // If the result is Infinity or NaN, throw an error
    if (!isFinite(result)) {
      throw new Error("Invalid result");
    }

    // Limit the number of decimal places to 9 and remove trailing zeros
    const limitedResult = result.toFixed(9).replace(/\.?0+$/, ""); // Remove trailing zeros

    return {
      currentValue: limitedResult,
      previousValue: limitedResult,
      previousExpression: `${fullExpression} =`,
      operator: null, // Reset operator after equal
      error: false,
    };
  } catch (error) {
    return {
      currentValue: "ERROR!",
      previousExpression: "",
      operator: null,
      error: true,
    };
  }
};


const handleOperator = (operator, state) => {
  if (state.error) return state; // Don't allow operator if error occurred

  return {
    ...state,
    previousExpression: `${state.previousExpression} ${state.currentValue} ${operator}`,
    currentValue: "0", // Reset current value for next number input
    operator, // Store operator for reference
    error: false,
  };
};

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "clear":
      return initialState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
        error: false,
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
        error: false,
      };
    case "sqrt":
      return {
        currentValue: `${Math.sqrt(parseFloat(state.currentValue))}`,
        error: false,
      };
    case "backspace":
      return {
        currentValue: state.currentValue.slice(0, -1) || "0",
        error: false,
      };
    case "operator":
      return handleOperator(value, state);
    case "equal":
      return handleEqual(state);
    default:
      return state;
  }
};

export default calculator;
