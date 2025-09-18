# Knowledge-Base Travel Planner – Setup & Nuclia RAG Integration

## 1. Install Dependencies

Make sure you have Node.js (v18+) and npm installed.

Install all dependencies (including KendoReact):

```
npm install
```

If you skipped the KendoReact install step, run:
```
npm install @progress/kendo-react-scheduler @progress/kendo-react-stepper @progress/kendo-react-grid @progress/kendo-react-charts @progress/kendo-react-dateinputs @progress/kendo-react-dialogs @progress/kendo-react-upload @progress/kendo-react-dropdowns @progress/kendo-react-buttons @progress/kendo-react-notification @progress/kendo-react-tooltip @progress/kendo-react-layout @progress/kendo-licensing @progress/kendo-data-query @progress/kendo-theme-default
```

## 2. Start the App

```
npm run dev
```

Open the local URL shown in your terminal.

## 3. Project Structure
- `src/components/pages/TripPlanner/TripPlanner.tsx`: Multi-step trip planner (Stepper, DateRangePicker, Scheduler)
- `src/components/pages/ExpenseTracker/ExpenseTracker.tsx`: Editable expenses grid, charts
- `src/components/pages/TravelFAQ/TravelFAQ.tsx`: FAQ chat (Dialog, Input, Button)
- `src/hooks/useTrips.ts`, `src/hooks/useExpenses.ts`: Mock CRUD hooks (replace with real API calls)

## 4. How to Connect FAQ Chat to Nuclia RAG API

1. **Get Nuclia API credentials** (see https://docs.nuclia.dev/ for details).
2. In `src/components/pages/TravelFAQ/TravelFAQ.tsx`, replace the `sendMessage` logic with an async call:

```ts
// Example (inside sendMessage):
const response = await fetch('https://your-nuclia-endpoint', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: input })
});
const data = await response.json();
setMessages(prev => [...prev, `You: ${input}`, `Bot: ${data.answer}`]);
```

3. Handle errors and loading states as needed.
4. Store your API keys securely (e.g., in environment variables).

## 5. Replace Mock Data with Real Backend
- Update the hooks in `src/hooks/` to use `fetch` or `axios` for real REST endpoints.
- Replace the local state logic with API calls for CRUD operations.

## 6. KendoReact Licensing
KendoReact requires a (free) trial or commercial license. See https://www.telerik.com/kendo-react-ui/ for details.

---

**You now have a fully working, extensible KendoReact travel planner!**
