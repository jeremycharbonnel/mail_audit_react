# Challenge Details

Development of an `Email Audit` system is currently in progress. Assume that this project is a real project and is being used in a production environment on a trial basis, since the features are not yet complete.

As the first assignment, two UI elements need to be implemented:

- The first one is called `RecipientsDisplay`, it is a table cell that is used to intelligently show email recipients inside the `AuditTable` component. This cell will trim recipients that are too long to display in the table.
- The second element is called `RecipientTooltip`, a tooltip-like component that will be used to display all of the email recipients, even ones that are trimmed in the table cell.

The task is to implement these UI elements in the `RecipientsDisplay` file within any of the included frameworks. Modifying or adding new props, re-ordering the recipients, and adding new or extra functionalities and features are not allowed in this assignment. Additionally, the component needs to be written in **Typescript**.

## `RecipientsDisplay`

- If all the recipient email addresses fit in the available space, we can simply display them delimited by a comma and space (e.g. `a, b`).
- When there is not enough space to display all recipients, we trim the text. However, to prevent showing clipped email addresses that are hard to read, we trim entire email addresses. If we cannot fit the entirety of a recipient email address, it shouldn't be shown at all.
- When at least one recipient is trimmed, we put a comma, space, and ellipsis after the last fitting recipient (e.g. `a, b, ...`). Furthermore, the rightmost end of the column should show a badge with the number of trimmed recipients (`+N`). We have provided the badge as a component called `RecipientsBadge` under `src/components`, and it accepts the number of truncated recipients as a prop.
- If there is not enough space to show even the first recipient, the badge should show the number of trimmed recipients excluding the first recipient, and the recipient should be truncated with an ellipsis only. If there is only one recipient, there will be no badge, and the recipient should still be truncated by an ellipsis.
- This functionality should work on any screen size and when the screen is resized. For simplicity, this will only be tested in a recent version of a Chromium browser.
- Do not modify or add new props to the `RecipientsBadge` component.
- Do not re-order the recipients.
- Do not add new/extra functionalities and features.

Assume that an employee can send an email to many recipients. Due to the limited amount of space, the information has to be displayed well. The design team has come up with the following design specifications:

- If all the email addresses in the recipients list fit in the available space, display them as they are, delimited by a comma and space (e.g. `John.Smith@gmail.com, Jane.Smith@outlook.com`).
- If there is not enough space to display the entire recipients list, it must be trimmed. To prevent showing clipped email addresses that are hard to read, show only the portion of the recipients list that does fit. In other words, if the entirety of an email address does not fit, it must not be shown.
- If the recipients list has been trimmed (i.e. at least one email address is not shown), add `, ...` after the last email address shown. Furthermore, the rightmost end of the column must indicate the number of trimmed recipients with the provided `RecipientsBadge` component.
- A special case is given to the first recipient. If there is not enough space to fit even the first recipient's email address, the email address is allowed to be clipped with an ellipsis. If there is only one recipient, a badge must not be shown. If there is more than one recipient, the first recipient must be excluded from the number of trimmed recipients in the badge.
- This functionality should work on any screen size and when the screen is resized. For simplicity, this will only be tested in a recent version of a `Chromium` browser.
- For the element that holds the list of recipients, the `display` must be set to `flex` and the `align-items` property must be set to `center` to ensure alignment correctness.

### `RecipientsDisplay` Examples

**Trim recipients that do not fit in the column. Show `, ...` after the last fitting recipient and a badge with `+N` at the end of the column.**

![Email trim example 1](Email%20trim%20example%201.svg)

**If there is not enough space to show the ellipsis and the extra space, trim that recipient as well.**

Incorrect:

![Email trim example 2A](Email%20trim%20example%202A.svg)

Correct:

![Email trim example 2B](Email%20trim%20example%202B.svg)

**If there is not enough space to show the first recipient, the badge should show the number of trimmed recipients excluding the first recipient, and the recipient should be truncated with an ellipsis only. If there is only one recipient, there should be no badge.**

Two recipients:

![Email trim example 3A](Email%20trim%20example%203A.svg)

One recipient:

![Email trim example 3B](Email%20trim%20example%203B.svg)

## `RecipientsTooltip`

Assume a use-case exists where the entirety of a recipient list must be made visible. The solution provided by the design team is to show the full list of the recipients at the **top right** corner of the viewport.

- The recipients list must be shown in a tooltip at the **top right** corner of the viewport.
- The tooltip must only be shown when the user hovers over a `RecipientsBadge` component.
- The tooltip must not be shown if the user is not hovering over a badge.
- The tooltip must display all of the email addresses in the recipients list, delimited by a comma and space (e.g. `John.Smith@gmail.com, Jane.Smith@outlook.com`).
- Do not create a new file, the tooltip must be located inside the `RecipientsDisplay` file.
- Do not re-order the recipients, display them as they are.
- Do not add new/extra functionalities and features.
- The tooltip should have the following styles:
  - Margin from the top right corner of the viewport is `8px`.
  - Padding top and bottom are `8px`.
  - Padding left and right are `16px`.
  - Background color is `#666`.
  - Text color is `#f0f0f0`.
  - Border radius is `24px`.
  - The `display` property must be set to `flex` and the `align-items` property must be set to `center` to ensure alignment correctness.

### `RecipientsTooltip` Examples

**An example format of showing the recipients list in the tooltip.**

```bash
a@test.example.com, b@test.example.com, c@test.example.com
```

**The example of margins for the recipients list.**

![Tooltip example 1](Tooltip%20example%201.png)

**The style example for recipients list in the tooltip.**

![Tooltip example 2](Tooltip%20example%202.png)
