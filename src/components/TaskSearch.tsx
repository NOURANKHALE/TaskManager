import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTaskSearch } from "@/Hooks/useTaskSearch";
import { TaskSearchProps} from "@/types/SearchProp";

export function TaskSearch({ 
  onSearchChange = () => {}, 
  hasResults = true,
  isLoading = false 
}: TaskSearchProps) {
  const {searchInput,handleInputChange,clearSearch,hasSearch} = useTaskSearch(onSearchChange);

  return (
    <div className="Task_Search space-y-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative w-full sm:flex-1 group">
          <Search 
            className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-violet-500 dark:text-violet-400 w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110 group-focus-within:scale-110" 
            aria-hidden="true"
          />
          <Input
            placeholder="Search tasks..."
            value={searchInput}
            onChange={handleInputChange}
            className="pl-10 sm:pl-14 py-4 sm:py-6 w-full text-base sm:text-lg rounded-md border text-gray-900 dark:text-gray-100 shadow-[0_0_8px_rgba(139,92,246,0.3)] sm:shadow-[0_0_12px_rgba(139,92,246,0.4)]"
            aria-label="Search tasks"
            disabled={isLoading}
          />
          {isLoading && (
            <Loader2 
              className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-violet-500 dark:text-violet-400 w-5 h-5 sm:w-6 sm:h-6 animate-spin" 
              aria-hidden="true"
            />
          )}
        </div>
        {hasSearch && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/50 transition-all duration-200 w-10 h-10 sm:w-12 sm:h-12"
            aria-label="Clear search"
            disabled={isLoading}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        )}
      </div>

      {!hasResults && searchInput && (
        <div className="text-center py-2 sm:py-4 text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium animate-fade-in">
          No tasks found matching {searchInput}
        </div>
      )}
    </div>
  );
}