"use client";

import { useEffect, useState } from "react";
import { RefreshCcwIcon, TagIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../_components/ui/sheet";
import { Button } from "../_components/ui/button";
import getTags from "../_actions/get-tags";

interface TagListProps {
    id: string;
    name: string;
    userId: string | null;
}

const SelectTag = ({ onSelectTag }: { onSelectTag: (tag: string) => void }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);
    const [tags, setTags] = useState<TagListProps[]>();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tags = await getTags();

                setTags(tags);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTags();
    }, []);
    const handleSelectTag = (tag: string) => {
        setSelectedTag(tag);
        setSheetOpen(false);
        onSelectTag(tag);
    };

    return (
        <Sheet open={sheetOpen}>
            <SheetTrigger
                className="flex gap-3 items-center justify-center"
                onClick={() => setSheetOpen(!sheetOpen)}
            >
                <TagIcon className="text-gray-500" />
                <p>{selectedTag ? selectedTag : "Selecione uma etiqueta"}</p>
                <RefreshCcwIcon className="text-gray-500" />
            </SheetTrigger>
            <SheetContent side="bottom">
                <div className="flex flex-col items-center">
                    <h1>Etiquetas</h1>
                    <ul className="flex flex-wrap ">
                        {tags?.map((tag) => (
                            <li key={tag.id} className="m-2">
                                <Button
                                    className="bg-secondary"
                                    onClick={() => handleSelectTag(tag.name)}
                                >
                                    {tag.name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SelectTag;
