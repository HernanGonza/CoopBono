<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the commercial proposal on the index route with anchor navigation, because its sections form one presentation.
- Keep fictional demo data and calculation helpers in src/lib/mockData.ts, because the demo must remain editable and independent of services.
- Keep demo state in React and lazy-load the Leaflet map behind ClientOnly, because data must remain ephemeral and map imports are browser-only.
- Define presentation styles and semantic colors in src/styles.css and button variants in the shared Button, because the proposal needs a consistent visual system.
