# Score-Calculator
Go to [description](description.md)
Welcome to the **Score-Calculator** repository!  
It is an interactive tool developed in React that allows you to evaluate and calculate the optimization of a project in different categories based on predefined criteria. Below is a summary of its functionality:

### **Main Features:**
1. **Evaluation Criteria:**
   - Multiple criteria are defined, each with specific importance and a scoring range (minimum, maximum).
   - Each criterion contains specific aspects with a description and a score, which can be positive or negative.

2. **Interactive Selection:**
   - Users can check options (checkboxes) for each aspect within the categories.
   - The selected options are processed to calculate a normalized score based on importance criteria and defined limits.

3. **Score Calculation:**
   - A general score is calculated based on the selected options.
   - The score is normalized to fit a scale from 0 to 10.
   - Data such as maximum, minimum, and obtained scores are generated.

4. **Category Validation:**
   - The component ensures that all categories have at least one selected option before proceeding with the score calculation. Otherwise, it displays an error message.

5. **Results and Visual Representation:**
   - Normalized results are displayed in a list with details for each category.
   - Visual representation of data using a `Line` chart (using `react-chartjs-2`).
   - Visual indicator of the general result with a component called `CircularProgressWithLabel`.

6. **Additional Features:**
   - Generates a report with details of the maximum, minimum possible, and the obtained score.
   - Uses colors to highlight obtained values based on their importance (e.g., green for positive, red for negative).

This project is ideal for evaluating projects under specific criteria, facilitating the identification of strengths and weaknesses in a visual and accessible environment.

## Technologies Used

This project was built using the following technologies and tools:

- **TypeScript**: For added safety with strict typing. (Pending implementation)
- **React**: JavaScript framework for building user interfaces.
- **Chart.js (with react-chartjs-2)**: For creating visualizations and interactive charts.
- **Material UI (MUI)**: Component library for better visual experience and design.
- **File Saver**: For downloading files generated from the application.

## Prerequisites

Make sure you have the following tools installed to work on this project:

- **Node.js** (version 18 or higher)
- **Yarn** (for package management)

## Installation

Follow the steps below to clone and start the project on your local environment:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-user/Score-Calculator.git
   cd Score-Calculator
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn start
   ```

4. Open your browser at `http://localhost:3000` to see the application in action.

## Contributions

Contributions are welcome! If you find any issues or have improvements in mind, feel free to open an [Issue](https://github.com/your-user/Score-Calculator/issues) or submit a pull request.

### How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b your-new-feature
   ```

3. Make your changes and commit them with a clear message:

   ```bash
   git commit -m "Description of the changes made"
   ```

4. Push the changes to the remote repository:

   ```bash
   git push origin your-new-feature
   ```

5. Open a pull request.

## Contact

If you have questions or suggestions, feel free to reach out to me at [fernando.espinosa@payclip.com](mailto:fernando.espinosa@payclip.com).

Thank you for reviewing this project!