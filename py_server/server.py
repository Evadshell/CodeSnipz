from flask import Flask, request, jsonify
import os
from crewai import Agent, Task, Crew, Process

app = Flask(__name__)

os.environ["OPENAI_API_BASE"] = 'https://api.groq.com/openai/v1'
os.environ["OPENAI_MODEL_NAME"] = 'llama3-70b-8192'  # Adjust based on available model
os.environ["OPENAI_API_KEY"] = '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'

@app.route('/explain-code', methods=['POST'])
def explain_code():
    data = request.json
    code = data.get('code')
    context = data.get('context', '')

    if not code:
        return jsonify({'error': 'Code is required'}), 400

    try:
        explainer = Agent(
            role="code briefer and enhanced",
            goal="Provide a brief explanation of the given code snippet so that the user understands it in one go.",
            backstory="You are an AI assistant whose job is to explain code",
            verbose=True,
            allow_delegation=False,
        )
        
        explain_code_task = Task(
            description=f"Explain the following code: '{code}' with the  Context: '{context}' where the user is facing problem in understanding the code.",
            agent=explainer,
            expected_output="A brief explanation of the code snippet to make user understand the problem with context."
        )

        crew = Crew(
            agents=[explainer],
            tasks=[explain_code_task],
            verbose=2,
            process=Process.sequential
        )

        output = crew.kickoff()
        return jsonify({'explanation': output})

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/enhance-code', methods=['POST'])
def enhance_code():
    data = request.json
    code = data.get('code')
    enhancement_request = data.get('enhancement_request', '')

    if not code:
        return jsonify({'error': 'Code is required'}), 400

    if not enhancement_request:
        return jsonify({'error': 'Enhancement request is required'}), 400

    try:
        enhancer = Agent(
            role="code enhancer",
            goal="Enhance the given code snippet based on the user's request.",
            backstory="You are an AI assistant whose job is to enhance code.",
            verbose=True,
            allow_delegation=False,
        )
        
        enhance_code_task = Task(
            description=f"Enhance the following code: '{code}' based on the user's request: '{enhancement_request}'",
            agent=enhancer,
            expected_output="An enhanced version of the code snippet based on the user's request."
        )

        crew = Crew(
            agents=[enhancer],
            tasks=[enhance_code_task],
            verbose=2,
            process=Process.sequential
        )

        output = crew.kickoff()
        return jsonify({'enhanced_code': output})

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
