"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import { IBadges } from "@/interfaces";
import { Badge } from "./badge";

interface IProps {
  options: IBadges[];
  setSelectedBadges: (badges: IBadges[]) => void;
  selectedBadges: IBadges[]
}

export default function MultiSelector({ options, setSelectedBadges, selectedBadges }: IProps) {
  console.log(setSelectedBadges)

  const handleSetValue = (badge: IBadges) => {
    let updatedBadges: IBadges[];
    if (selectedBadges.some(selected => selected.id === badge.id)) {
      updatedBadges = selectedBadges.filter(b => b.id !== badge.id);
    } else {
      updatedBadges = [...selectedBadges, badge];
    }
    setSelectedBadges(updatedBadges);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="justify-between"
        >
          <div className="flex gap-2 overflow-hidden">
            {selectedBadges.length > 0
              ? selectedBadges.length > 3
                ? (
                  <div className="flex items-center">
                    {selectedBadges.slice(0, 3).map((badge) => (
                      <Badge key={badge.id} className="mr-1">
                        {badge.name}
                      </Badge>
                    ))}
                    <span className="text-muted-foreground">+{selectedBadges.length - 3} more</span>
                  </div>
                ) 
                : selectedBadges.map((badge) => (
                  <Badge key={badge.id} className="mr-1">
                    {badge.name}
                  </Badge>
                ))
              : "Select badges..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search badge..." />
          <CommandEmpty>No badges found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((badge) => (
                <CommandItem
                  key={badge.id}
                  onSelect={() => handleSetValue(badge)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedBadges.some(selected => selected.id === badge.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {badge.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
