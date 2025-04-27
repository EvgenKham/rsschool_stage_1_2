## Video

[YouTube video link](https://www.youtube.com/watch?v=OvV_5fEUtak)

---

## Presentation

[Link to your Reveal slide deck](https://evgenkham.github.io/presentation_MVC/)

---

## Presentation transcript link

### Introduction

When we write complex applications, we need to perform various operations, sometimes completely unrelated to each other: updating data on the server, showing a popup after a user's click, validating form data, loading additional resources, images, scripts, invoking third-party APIs, and handling responses. It is considered good practice to divide differing code into modules that are responsible for their specific tasks. The MVC pattern seeks to answer how to divide code into modules, based on what criteria and principles

## In Brief
MVC (which stands for Model-View-Controller) is an architectural pattern that divides modules into three groups:
- Model
- View
- Controller
The model contains the application's data that the user interacts with. For example, a list of their orders in an online store.
The view presents this data in a user-friendly manner, such as on a rendered web page or in a mobile application.
Controllers take user commands and transform the data based on these commands. For example, if the user clicks the "Delete Order" button, the controller marks that order as deleted in the model.

## Architecture Components
In MVC architecture, the user interacts only with the view—typically the UI. The user submits commands to the program. The controller receives these commands and updates the model's data. The model is updated and notifies the view that it needs to redraw the interface to reflect changes in the data. Let’s imagine we want to write a flashlight application. It will have two states: on and off. The states will be toggled by an "On/Off" button. It will also have buttons to switch between daytime and nighttime light, changing the bulb’s color to blue and yellow respectively.

  **Model**
The model contains the application's data. This is the most independent component of the architecture, as the view's output and the controller's operations depend on it. In the model, we will hold the flashlight's state. By default, we will turn it off. When the user turns on the flashlight, the field "isOn" should take the value "true," which will be handled by the controller. The field "color" contains the color the flashlight will emit.
  **Controller**
The controller receives commands from the user and transforms model data according to these commands. In our application, the controller will contain a function for toggling the flashlight's state. The controller can also accept and process data from the view. For instance, we can switch colors using specific buttons, and then the controller will check which button was clicked to turn on the appropriate color. In our example, the controller checks which color button was pressed—daylight or nighttime—and selects the corresponding color based on the clicked button.
  **View**
The view presents data from the model to the user in a convenient and understandable format. In our case, the view would be the flashlight itself, which can emit two colors, along with the buttons to turn it on and switch colors. In addition to the markup, the view can include code that manages the flashlight's display. It also includes the code for handling events that the view will pass on to the controller.

## Similar Patterns
In addition to MVC, you may have heard of other variations of this acronym. Each variation is a pattern that slightly differs from MVC.

  **Model-View-Presenter**
The main difference with MVC is how components are located and, accordingly, how data is transmitted. If the data in MVC was passed around, then the components in MVP are placed on a line. The presenter takes on all the logic for data handling, updating the view, and processing user commands. The view, in this case, is passive. The advantage of this approach is that there are no questions about what code belongs where. The downside is that the presenter can become large and complex quickly, requiring it to be broken into smaller modules, possibly adding additional "layers."

  **Model-View-ViewModel**
In MVVM (Model-View-ViewModel), the ViewModel replaces the controller. This is an "overlay" on the view that binds the data and the view in such a way that developers do not need to write the UI update logic and user command handling themselves. A Binder—a framework, library, or even an entire language—is necessary for the binding to work, automatically mapping changes from the model to the UI.

## Conclusion
In the process of developing complex applications, architectural patterns like MVC, MVP, and MVVM become critically important for simplifying code structure and improving its readability. It is essential to remember that the choice of a particular architectural pattern depends on the specifics of the project and the requirements for component interaction.
