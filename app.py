from flask import Flask, render_template

# Create a Flask application instance.
app = Flask(__name__)

# The main home page route.
@app.route('/')
def index():
    # Renders the index.html template.
    return render_template('index.html')

# The login page route.
@app.route('/login')
def login():
    # Renders the login.html template.
    return render_template('login.html')

# The cart page route.
@app.route('/cart')
def cart():
    # Renders the cart.html template.
    return render_template('cart.html')
    
# You would add similar routes for other pages like 'footwear', 'jackets', 'orders', etc.
# Example:
# @app.route('/footwear')
# def footwear():
#     return render_template('footwear.html')

# Run the application if the script is executed directly.
if __name__ == '__main__':
    # 'debug=True' reloads the server automatically on code changes.
    app.run(debug=True)