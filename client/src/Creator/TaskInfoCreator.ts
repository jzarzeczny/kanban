import { TaskInfo } from "../validators/taskValidators";

class TaskInfoCreator {
    static createTaskInfo(taskId: string) {
        const card = document.getElementById(taskId) as HTMLElement;
        if (!card.children[5]) {
            card.insertAdjacentHTML(
                "beforeend",
                `
            
        <div class='task__info__container'>
  <h2 class='task__info__header'>Change log</h2>
  <ul class='task__info__list task__info__list--${taskId}'>


  </ul>
</div>
        
        `
            );
        }
    }

    static createTaskSingleInfo(taskId: string, taskSingleInformation: TaskInfo): void {
        const listItem = document.querySelector(`.task__info__list--${taskId}`) as HTMLElement;

        const date = new Date(taskSingleInformation.time);
        const formattedDate = date.toLocaleDateString("pl-PL");
        const formattedTime = date.toLocaleTimeString("pl-PL");
        listItem.insertAdjacentHTML(
            "afterbegin",
            `
                <li class='task__info__listItem'>
                <div task__info__line>
                      <p class='task__info__label'>Author:</h>
      <p class='task__info__content'>${taskSingleInformation.author}</p>
                </div>
    <div task__info__line>
      <p class='task__info__label'>Change:</p>
      <p class='task__info__content'>${taskSingleInformation.change}</p>
    </div>
    <div task__info__line>
          <p class='task__info__label'>Time:</p>
      <time class='task__info__content'>${formattedTime} - ${formattedDate}</time>

    </div>

    </li>
        `
        );
    }
    static removeTaskInfo(taskId: string) {
        const card = document.getElementById(taskId) as HTMLElement;

        if (card.children[5]) {
            card.removeChild(card.children[5]);
        }
    }
}

export { TaskInfoCreator as CardInfoCreator };
