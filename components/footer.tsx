export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-foreground/5 py-7 px-20">
      <p className="max-w-xs font-mono text-xs leading-loose text-muted-foreground uppercase">
        &copy; {new Date().getFullYear()} Product Explorer. All rights reserved.
      </p>
    </footer>
  );
}
