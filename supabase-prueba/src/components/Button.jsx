export default function Button({ direc }) {
  return (
    <a
      href={direc}
      class="group relative px-3 py-1.5 text-lg tracking-tighter text-sky-800 dark:text-sky-300"
    >
      <span class="absolute inset-0 border border-dashed border-sky-300/60 bg-sky-400/10 group-hover:bg-sky-400/15 dark:border-sky-300/30"></span>
      Iniciar Sesión
      <svg
        width="5"
        height="5"
        viewBox="0 0 5 5"
        class="absolute -top-0.5 -left-0.5 fill-sky-300 dark:fill-sky-300/50"
      >
        <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
      </svg>
      <svg
        width="5"
        height="5"
        viewBox="0 0 5 5"
        class="absolute -top-0.5 -right-0.5 fill-sky-300 dark:fill-sky-300/50"
      >
        <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
      </svg>
      <svg
        width="5"
        height="5"
        viewBox="0 0 5 5"
        class="absolute -bottom-0.5 -left-0.5 fill-sky-300 dark:fill-sky-300/50"
      >
        <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
      </svg>
      <svg
        width="5"
        height="5"
        viewBox="0 0 5 5"
        class="absolute -right-0.5 -bottom-0.5 fill-sky-300 dark:fill-sky-300/50"
      >
        <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
      </svg>
    </a>
  );
}
