var currentStep = 1;
var currentStepProgress = ".step-container-" + 1;
var updateProgressBar;

function displayStep(stepNumber) {
  if (stepNumber >= 1 && stepNumber <= 3) {
    $(".step-" + currentStep).hide();
    $(".step-" + stepNumber).show();
    currentStep = stepNumber;
    currentStepProgress = ".step-container-" + stepNumber;
    updateProgressBar();
  }
}

$(document).ready(function () {
  $("#multi-step-form").find(".step").slice(1).hide();

  $(".next-step").click(function () {
    if (currentStep < 3) {
      $(".step-" + currentStep).addClass(
        "animate__animated animate__fadeOutLeft"
      );
      currentStep++;
      setTimeout(function () {
        $(".step")
          .removeClass("animate__animated animate__fadeOutLeft")
          .hide();
        $(".step-" + currentStep)
          .show()
          .addClass("animate__animated animate__fadeInRight");
        displayStep(currentStep);
        updateProgressBar();
      }, 500);
    }
  });

  $(".prev-step").click(function () {
    if (currentStep > 1) {
      $(".step-" + currentStep).addClass(
        "animate__animated animate__fadeOutRight"
      );
      currentStep--;
      setTimeout(function () {
        $(".step")
          .removeClass("animate__animated animate__fadeOutRight")
          .hide();
        $(".step-" + currentStep)
          .show()
          .addClass("animate__animated animate__fadeInLeft");
        displayStep(currentStep);
        updateProgressBar();
      }, 500);
    }
  });

  updateProgressBar = function () {
    var allSteps = document.querySelectorAll("[class^='step-container']");
    Array.from(allSteps).forEach((step) => {
      step.style.color = "gray";
    });
    $(currentStepProgress).css("color", "#1759ab");
  };
});