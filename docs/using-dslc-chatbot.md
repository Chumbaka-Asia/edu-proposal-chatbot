# Using the DSLC Chatbot to Build Your Data Science Proposal

> **Learning objectives**
> - Navigate the five stages of the Data Science Lifecycle using an interactive chatbot
> - Upload and analyse a dataset with guidance from an AI mentor
> - Generate a professional project proposal that documents your data science approach

The Data Science Lifecycle (DSLC) chatbot is your digital mentor that guides you step by step from that initial Opportunity Statement to a complete project proposal. In this lesson, you'll explore how to structure your work and use the chatbot to create your own data science project proposal.

### Step 1 - Access the DSLC chatbot

1. Open the DSLC chatbot: https://dslc-chatbot.web.app/

    Bookmark this page for future reference.

2. The chat panel on the left side is where you'll interact with your AI mentor.

3. The middle panel is where you will fill in the details for your proposal.

4. The right panel shows your progress through the five stages of the Data Science Lifecycle: Define, Collect, Clean, Train, and Deploy.

> 💡 Progress is automatically saved locally in your browser. It will saved on the same device and browser across sessions but will be lost if you clear your browser data, use a different browser or device, or browse in private/incognito mode.

### Step 2 - Define your research question

1. You start at the **Define** stage.

    Read through the four segments that help you build your problem statement.

    Notice how each segment builds on the previous one, from broad opportunity to specific data question.

    > 📖 Professional data scientists use this funnel approach to move from human problems to computer-solvable questions.

2. Complete the **Opportunity Statement** text box.
    - Use the prompt '[Person] is a [Role] who faces the problem of [What]'
    - Think about a specific person or group with a real challenge
    - Example: 'Students are learners who face the problem of choosing healthy lunch options'
    > How does focusing on a specific person help you understand the problem better?

3. Develop your **Design Thinking Problem Statement**.
    - Fill in the text box using the five Whys approach for root cause analysis
    - Use the prompt '[Person], a [Characteristic], faces the problem of [what] at [where] during [when] through [how] because [root cause]'
    - This helps you dig deeper into why the problem exists
    - Discuss with the chatbot if you need help identifying the root cause
    > 💡 The five Whys technique helps you move beyond surface-level observations to understand underlying causes.

4. Create your **Data-Driven Problem Statement**.
    - Translate your human problem into a specific question for the computer
    - Use the structure 'Can we [classify/predict/detect] [target] using [data] to determine [outcome]?'
    - Example: 'Can we predict student lunch choices using past purchase data to determine healthy option preferences?'
    - Use the chat to refine this statement until it's clear and data-focused
    > This is where your problem becomes something a computer can help solve. What makes this statement different from the earlier ones?

5. Define your **Success measure**.
    - Fill in a clear 'we succeeded if…' statement
    - Make it specific and measurable
    - Example: 'Detect lunch preferences with at least 85% accuracy'
    > ⚠️ Success measures prevent scope creep and help you know when you're done. They should be achievable with your available data.

6. Select **Save Define stage** once you've completed all four segments. 👉 Ensure the Data-Driven Problem Statement and Success Measure are filled in, as these are required to advance.

### Step 3 — Collect and upload your dataset

1. Select the **Collect** stage, which is now unlocked.
    - Read the guidance about what makes a good dataset
    - Prepare to upload a CSV file with data relevant to your question
    > 💡 CSV (Comma-Separated Values) files are a standard format for storing tabular data. Most spreadsheet programmes can export to CSV.

2. Choose a dataset that relates to your research question.
    - Use a dataset you've already collected, or select from sample datasets provided by your mentor
    - Ensure your CSV file has clear column headers in the first row
    > Think about the connection between your Define stage question and the data you're choosing. Does this dataset contain information that can answer your question?

3. Select the **Choose CSV file** button and upload your dataset.
    - Wait for the file to upload and process
    - Review the automatic summary that appears, showing column names, data types, and sample values
    - Read the chatbot's analysis of your dataset's strengths and potential issues
    > 📖 The chatbot examines your data's structure, identifies numeric and text columns, and spots potential problems like missing values.

4. Answer the chatbot's question about your data.
    - The chatbot asks 'In one sentence: what does one row in your CSV represent in real life?'
    - Type your response to help both you and the chatbot understand your data structure
    - Example: 'Each row represents one student's lunch purchase on a specific day'
    > What new insights about your dataset did you gain from the chatbot's analysis and statistics?

5. Select **Confirm dataset** once you're satisfied with your dataset choice.
    - This marks the Collect stage as complete
    > 💡 The chatbot notes that missing values or inconsistent labels are fine. You'll address these in the next stage.

### Step 4 — Clean your data

1. Select the **Clean** stage to begin preparing your data for analysis.
    - Review the cleaning checklist that shows three key statistics: missing cells, outlier values, and numeric columns
    - Notice how the chatbot has analysed your data automatically
    > 💡 Real-world data is messy. Professional data scientists often spend 50-70% of their time cleaning data before analysis.

2. Make decisions about missing values.
    - Choose between two approaches: **Delete rows with missing** or **Fill missing values**
    - Consider the trade-offs: deleting removes incomplete data but loses information; filling preserves rows but makes assumptions
    - Select one of the two buttons to record your choice
    > 📖 If you fill missing values, numeric columns use the column mean, and other columns use 'unknown'. Why might filling with the mean be helpful? What problems could it cause?

3. Decide how to handle outliers.
    - Choose between **Remove outlier rows** or **Keep all (highlight outliers)**
    - Remember that outliers are values more than three standard deviations from the column mean
    - Discuss with the chatbot whether outliers in your dataset might be errors or genuine extreme values
    > Why do you think data cleaning is so important? What could go wrong if we analyse data with outliers that are actually errors?

4. Optionally standardise label consistency.
    - If you have a label column (for categories), select it from the **Label column** dropdown
    - Choose whether to apply **Trim + lowercase** standardisation or **Do not change**
    - This helps ensure labels like 'Yes', 'yes', and ' Yes ' are treated consistently
    > Think about how inconsistent labels might confuse a computer. How is this different from how humans read data?

5. Select **Apply cleaning** to process your data.
    - Wait for the cleaning operations to complete
    - Review the preview that appears below, showing your data before and after cleaning
    - Examine the log that explains what changes were made
    > How did the cleaning operations transform your dataset? Did you lose any important information?

6. Download your cleaned dataset.
    - Select **Download cleaned CSV** to save the processed file
    - Store it in your project folder with a clear name like 'my-data-cleaned.csv'
    - The Clean stage automatically marks as complete once you've applied cleaning
    > ⚠️ Keep both your original and cleaned datasets. You might need to try different cleaning approaches later.

### Step 5 — Explore training recommendations

1. Select the **Train** stage to learn about machine learning approaches.
    - Read the guidance about choosing your problem type
    - Notice that you must complete the Clean stage before this stage unlocks
    > 💡 The chatbot recommends different algorithms depending on whether you're predicting numbers (regression), categories (classification), or finding patterns (clustering).

2. Choose your problem type.
    - Select one of three options: **Predict a number**, **Predict a category**, or **Find groups (no labels)**
    - Think about your research question from the Define stage
    - The chatbot asks: 'What is one example of an input reading, and what output label or number should the model produce?'
    - Type your response to clarify your thinking
    > 📖 Regression predicts continuous numbers (like temperature or price). Classification predicts categories (like 'yes' or 'no'). Clustering finds patterns without labels.

3. Select your target column (optional).
    - If you are predicting something, choose which column from your dataset is the thing you want to predict
    - Use the **Target column** dropdown to select it
    - You can leave it as '(not sure yet)' if you need more time to decide
    > Think about the connection between your target column and your research question. Is this the outcome you want to understand?

4. Examine the recommended widgets.
    - Review the list of suggested machine learning widgets that appears
    - Read the description of what each widget does and when to use it
    - Select **Open** to explore a widget in a new tab
    - Upload your cleaned CSV to the widget and experiment with it
    > Widgets are interactive tools that let you experiment with machine learning algorithms without writing code. They help you understand how algorithms work.

5. Record your result after testing.
    - Return to the chatbot after trying a widget
    - Enter your result in the **Record your result** text box
    - Example: 'Accuracy 87%' or 'MSE 0.23' or 'Purity 0.91'
    - Select **Save Train stage** to record your work
    > You don't need to fully master the algorithm in this lesson. Recording what you learned is the important step for your proposal.

### Step 6 — Plan deployment and generate your proposal

1. Select the **Deploy** stage to create your final deliverable.
    - Read the guidance about deployment planning
    - Notice there are four text boxes that help you think about real-world implementation
    > 💡 A proposal is a professional document that explains your project plan to others. Scientists, engineers, and researchers write proposals to communicate their ideas.

2. Complete the **Deployment context** text box.
    - Describe where your model will run and who will use it
    - Example: 'The ESP32 will sit near the doorway and measure foot traffic every 30 seconds'
    - Think about the physical or digital environment
    > How does thinking about deployment context change how you view your project? What practical constraints do you need to consider?

3. Fill in the **Alerts and action** text box.
    - Explain what happens after the model makes a prediction
    - Example: 'If risk is high, the device will send an alert to the monitoring dashboard'
    - Consider how your system will communicate results to users
    > 📖 The value of machine learning comes from taking action on predictions. What specific actions make sense for your project?

4. Address **Risk and safety** concerns.
    - Describe what could go wrong with your system
    - Explain your safety plan for handling mistakes
    - Example: 'If it misses an event, we will review the sensor logs and retrain with that data'
    > ⚠️ All systems can fail. Professional data scientists plan for failure and design safety mechanisms.

5. Plan how to **Improve the model**.
    - Explain how you will make it better after initial testing
    - Example: 'Collect 50 more examples in different lighting conditions and retrain'
    - Think about continuous improvement over time
    > Real projects iterate. How will you learn from real-world usage to improve your model?

6. Select **Generate proposal** to create your document.
    - Wait whilst the chatbot synthesises all your work from previous stages
    - The chatbot asks: 'Before you submit, what is one thing you will test in the real world first?'
    - Type your response to demonstrate your testing plan
    - Read through the generated proposal that appears in the text box below
    > 📖 The chatbot uses artificial intelligence to write a cohesive narrative from all the information you provided throughout the lifecycle.

7. Review and download your completed proposal.
    - Read each section carefully
    - Check that it accurately reflects your Define stage problem, dataset, cleaning steps, algorithm choice, and deployment plans
    - Select **Download proposal** to save as a text file
    - Store it with your project files
    > ⚠️ This proposal is a starting point, not a finished product. You should review and personalise it further before submitting for assessment.

### Step 7 — Share and reflect

- What was the most challenging stage of the Data Science Lifecycle for you, and why?
- How did the chatbot's guidance change the way you approached your research question?
- What would you do differently if you were to start a new project tomorrow with the DSLC chatbot?
- How might professional data scientists use tools like this in their daily work?
- Share your proposal with a partner. Give each other one piece of positive feedback and one suggestion for improvement.

> 💡 The Data Science Lifecycle is iterative. Real projects often loop back to earlier stages as you learn more. Your first proposal is just the beginning of the journey.
