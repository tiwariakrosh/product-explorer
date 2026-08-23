interface StateMessageProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

function StateMessage({ title, description, action }: StateMessageProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line px-6 py-16 text-center dark:border-line-dark">
      <h3 className="font-display text-base font-semibold text-ink dark:text-ink-dark">
        {title}
      </h3>
      <p className="max-w-sm text-sm text-ink-soft dark:text-ink-dark-soft">
        {description}
      </p>
      {action}
    </div>
  );
}

export function EmptyState({ searchTerm }: { searchTerm?: string }) {
  return (
    <StateMessage
      title={
        searchTerm ? `No results for "${searchTerm}"` : "No products found"
      }
      description="Try a different search term, or clear your filters to see everything in the catalog."
    />
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <StateMessage
      title="Couldn't load products"
      description={message}
      action={
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          Try again
        </button>
      }
    />
  );
}
