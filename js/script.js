// Define minimum quantity rules

const minimumQuantity = {
    51: 2, // Chapathi
    52: 2, // Dhal
    53: 2, // Paneer Power Curry
    54: 2, // Golden Chickpea Curry
    55: 2, // Chickpea Paneer Curry
    56: 2, // Wholesome Soya Curry
    57: 2, // Mushroom Magic Curry
    58: 2,  // Egg Protein Curry
    59: 2, 
    60: 2, 
    61: 2, 
    62: 2, 
    63: 2, 
    64: 2, 
    65: 2, 
    66: 2  
  
};

// Function to decrease quantity
function decreaseQuantity(id) {
    const quantityInput = document.getElementById(`quantity${id}`);
    let quantity = parseInt(quantityInput.value);
    const min = minimumQuantity[id] || 1; // default to 1 if not specified

    if (quantity > min) {
        quantityInput.value = quantity - 1;
        updateSubtotal(id);
        updateTotal();
    }
}

// Function to increase quantity
function increaseQuantity(id) {
    const quantityInput = document.getElementById(`quantity${id}`);
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
    updateSubtotal(id);
    updateTotal();
}

// Function to update subtotal
function updateSubtotal(id) {
    const quantityInput = document.getElementById(`quantity${id}`);
    const price = parseInt(quantityInput.getAttribute('data-price'));
    let quantity = parseInt(quantityInput.value);
    const min = minimumQuantity[id] || 1;

    // Enforce minimum quantity even if typed manually
    if (quantity < min) {
        quantity = min;
        quantityInput.value = min;
    }

    const subtotal = quantity * price;
    document.getElementById(`subtotal${id}`).innerText = `₹${subtotal}`;
}

// Function to calculate total price
function calculateTotal() {
    let total = 0;

    for (let i = 1; i <= 25; i++) {
        const subtotalElement = document.getElementById(`subtotal${i}`);
        if (subtotalElement) {
            const subtotalText = subtotalElement.innerText.replace('₹', '').trim();
            const subtotal = parseInt(subtotalText, 10) || 0;
            total += subtotal;
        }
    }

    return total;
}


// Optional: if you call this elsewhere
function updateTotal() {
    const total = calculateTotal();
    const totalDisplay = document.getElementById('cartTotal'); // Add if you show it somewhere
    if (totalDisplay) {
        totalDisplay.innerText = `${total}`;
    }
}



/*Submenu dropdown functionality to work on mobile or tablets */

document.querySelectorAll('.menu-item').forEach(item => 
{
    item.addEventListener('click', event => 
    {
        const submenu = item.querySelector('.submenu');
        if (submenu) 
        {
            submenu.classList.toggle('show');
        }
    });
});



   /*header for mobile navigation*/

 // Toggle main menu open/close

document.querySelector('.toggle-1').addEventListener('click', function() {
    const menuToggle = this;
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    // Toggle aria-expanded and the class to manage menu visibility

    menuToggle.setAttribute('aria-expanded', !isExpanded);
    document.body.classList.toggle('menu-open');                          // Toggles the "menu-open" class on the body or parent container
});


document.querySelectorAll('.accordion-menu').forEach(menuLink => {
    menuLink.addEventListener('click', function(event) {
        const chevronIcon = this.querySelector('.bi-chevron-down');
        
                                                                      // Check if the clicked element is the chevron (expand icon)
        if (event.target === chevronIcon) {
                                                                     // Prevent default action to stop the link from navigating when clicking the chevron
            event.preventDefault();
            
            // Toggle the submenu visibility
            let submenu = this.nextElementSibling;                  // Get the next element (submenu)
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }


            // Rotate the chevron icon
            chevronIcon.classList.toggle('rotated');
        } else {
         
            // Else, let the menu link perform its default behavior (navigation)
            // Do nothing here, so the default action (navigating) happens naturally
         
        }
    });
});

/*macro-Calculator*/

/*
document.getElementById("macroForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const heightFeet = parseInt(document.getElementById("heightFeet").value);
  const heightInches = parseInt(document.getElementById("heightInches").value);
  const gender = document.getElementById("gender").value;
  const activity = parseFloat(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  if (
    isNaN(age) || age <= 0 ||
    isNaN(weight) || weight <= 0 ||
    isNaN(heightFeet) || heightFeet < 0 ||
    isNaN(heightInches) || heightInches < 0 || heightInches > 11 ||
    !gender || !activity || !goal
  ) {
    document.getElementById("result").innerText = "Please fill all fields correctly.";
    return;
  }

  const heightCm = (heightFeet * 30.48) + (heightInches * 2.54);

  // Calculate BMR
  let bmr;
  if (gender === "male") {
    bmr = 66.5 + (13.75 * weight) + (5.003 * heightCm) - (6.75 * age);
  } else {
    bmr = 655.1 + (9.563 * weight) + (1.850 * heightCm) - (4.676 * age);
  }

  // TDEE
  let tdee = bmr * activity;

  // Goal adjustment
  if (goal === "loss") {
    tdee -= 500;
    if (tdee < bmr * 1.1) tdee = bmr * 1.1; // Prevent too low calories
  } else if (goal === "gain") {
    tdee += 300;
  }

  // Protein per kg based on gender, goal, and activity level
let proteinPerKg;

if (gender === "male") {
  if (goal === "gain") {
    if (activity >= 1.75) {
      proteinPerKg = 2.2;
    } else if (activity >= 1.55) {
      proteinPerKg = 2.0;
    } else {
      proteinPerKg = 1.8;
    }
  } else if (goal === "loss") {
    proteinPerKg = 2.2; // Slight bump for preserving lean mass
  } else {  // maintain
    if (activity >= 1.75) {
      proteinPerKg = 1.8;
    } else if (activity >= 1.55) {
      proteinPerKg = 1.6;
    } else {
      proteinPerKg = 1.4;
    }
  }
} else { // female
  if (goal === "gain") {
    if (activity >= 1.75) {
      proteinPerKg = 2.0;
    } else if (activity >= 1.55) {
      proteinPerKg = 1.8;
    } else {
      proteinPerKg = 1.6;
    }
  } else if (goal === "loss") {
    proteinPerKg = 2.0; // Increased for muscle preservation
  } else {  // maintain
    if (activity >= 1.75) {
      proteinPerKg = 1.6;
    } else if (activity >= 1.55) {
      proteinPerKg = 1.4;
    } else {
      proteinPerKg = 1.2;
    }
  }
}

  const protein = Math.round(proteinPerKg * weight);
  const proteinKcal = protein * 4;

  // Fixed: fats = 25% of total kcal
  const fatKcal = tdee * 0.25;
  const fats = Math.round(fatKcal / 9);

  // Carbs = remaining calories
  const remainingKcal = tdee - (proteinKcal + fatKcal);
  const carbs = Math.round(remainingKcal / 4);

  const calories = Math.round(tdee);

  document.getElementById("result").innerHTML = `
    <h3>Your Daily Nutrition Needs</h3>
    <div class="macro">🔋 <strong>Calories:</strong> ${calories} kcal/day</div>
    <div class="macro">💪 <strong>Protein:</strong> ${protein} g (~${proteinPerKg.toFixed(2)} g/kg body weight)</div>
    <div class="macro">🍚 <strong>Carbohydrates:</strong> ${carbs} g</div>
    <div class="macro">🥑 <strong>Fats:</strong> ${fats} g</div>
    <p style="font-size: 0.85em; color: #555; margin-top: 15px;">
      These numbers are scientifically estimated. For individual needs, consult a qualified nutritionist.
    </p>
  `;
});
*/

/*WhatsApp chat widget text*/

function updateWhatsAppText() {
    const waText = document.querySelector('.wa__btn_popup_txt span');
    const waContainer = document.querySelector('.wa__btn_popup_txt');

    if (waText) {
        waText.innerHTML = 'Place your order here via <strong>WhatsApp</strong>';
        waContainer.style.visibility = 'visible'; // Make it visible
    }
}

/*subscription*/

function updateSubscriptionText(subscriptionType, whatsappUrl) {
    // Define predefined message for each subscription type
    let predefinedMessage;
    if (subscriptionType === 'Daily') {
        predefinedMessage = "Hi, I’m interested in subscribing to the Daily plan with Saviour Bites.";
    } else if (subscriptionType === 'Weekly') {
        predefinedMessage = "Hi, I’m interested in subscribing to the Weekly plan with Saviour Bites.";
    } else if (subscriptionType === 'Monthly') {
        predefinedMessage = "Hi, I’m interested in subscribing to the Monthly plan with Saviour Bites.";
    }

    // Append the message to the WhatsApp URL
    const whatsappUrlWithMessage = `${whatsappUrl}&text=${encodeURIComponent(predefinedMessage)}`;

    // Select the text container and update the display message
    const waText = document.querySelector('.wa__btn_popup_txt span');
    const waContainer = document.querySelector('.wa__btn_popup_txt');
    

    // Apply styles for background and text color
    waContainer.style.backgroundColor = 'black';
    waContainer.style.color = 'white';
    waContainer.style.padding = '10px';
    waContainer.style.borderRadius = '8px';
    waContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
   
    
    // Hide the container briefly to reset visibility
    waContainer.style.visibility = 'hidden';

    // Update the text content with subscription type
    waText.innerHTML = `Get your ${subscriptionType} subscription now via <strong>WhatsApp</strong>`;

    // Show the message for a short time before redirecting
    setTimeout(() => {
        waContainer.style.visibility = 'visible';
    }, 100); // Adjust the delay if necessary

    // Delay the redirect to WhatsApp with the custom message
    setTimeout(() => {
        window.location.href = whatsappUrlWithMessage;
    }, 1000); // 1-second delay before redirecting, adjust as needed
}
