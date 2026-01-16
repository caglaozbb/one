# Seesaw Simulation

A simple, interactive physics simulation of a seesaw where you can place weights. It does not use any framework or library. It is a vanilla javascript, html, css application.

## Usage 

You can place weights on the seesaw by clicking on it. The weight is random between 1 and 10. Tilt angle is clamped between -30 and 30.

## Thought Process

I firstly implemented the skeleton of the application. Then proceed to the main core logic. The core logic uses the formula `Sum(Weight × Distance)` to determine the tilt. 

Here is the core logic in pseudo code:

```
state = { weights: [], totalTorque: 0 }

OnPlankClick(mouse_x):
  dist = mouse_x - plank_center
  weight = random(1, 10)

  state.weights.push({ weight, dist })
  state.totalTorque += weight * dist

  angle = clamp(state.totalTorque / sensitivity, -30, 30)
  UpdateUI(angle, weight, dist)
  SaveToLocalStorage(state)
```

## Design Decisions

I tried to keep the code clean and simple. The UI of the application is inspired by the provided example. I used the formula `Sum(Weight × Distance)` to determine the tilt. 

I considered this simulation as a game. And saved its state in storage. Instead of creating a new prop for every vars in the sate. I decided to use JSON, stringify the current state and save. For loading, parse the JSON and update the state.

## Usage of AI

I mostly used the autocomplete feature to iterate it faster. Core logic of the simulation written by me. 

## Limitations

There is a case that if weight placed just right the center it does not calculate precisely. I may add some calculation to make it more precise.