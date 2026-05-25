import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/config/baseUrl";

import {
    Download,
    FileSpreadsheet,
    FileText
} from "lucide-react";


interface Props {
    fileName?: string;
    url?: string;
    contentType?: string;
    size?: string;
}

/**
 * Card minimalista para archivos adjuntos.
 */
export const MessageFileCard = ({
    fileName,
    url,
    contentType,
    size
}: Props) => {

    const href:string = `${baseUrl}/${url}`;

    /** Saber si es Excel */
    const isExcel =
        contentType?.includes("spreadsheet") ||
        contentType?.includes("excel");

    return (
        <Card
            className="
                mt-4
                rounded-2xl
                border
                bg-background/60
                p-4
                shadow-sm
            "
        >

            <div className="flex items-center justify-between gap-4">

                {/* Información */}
                <div className="flex min-w-0 items-center gap-3">

                    {/* Icono */}
                    <div
                        className={`
                            flex
                            size-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            ${isExcel
                                ? "bg-green-600 text-white"
                                : "bg-muted"}
                        `}
                    >
                        {isExcel ? (
                            <FileSpreadsheet className="size-5" />
                        ) : (
                            <FileText className="size-5" />
                        )}
                    </div>

                    {/* Texto */}
                    <div className="min-w-0">

                        <p
                            className="
                                truncate
                                text-sm
                                font-medium
                            "
                        >
                            {fileName}
                        </p>

                        <div className="flex items-center gap-2">

                            <span className="text-xs text-muted-foreground">
                                {isExcel
                                    ? "Archivo Excel"
                                    : "Archivo adjunto"}
                            </span>

                            {size && (
                                <>
                                    <span className="text-xs text-muted-foreground">
                                        •
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        {size}
                                    </span>
                                </>
                            )}

                        </div>

                    </div>
                </div>

                {/* Descargar */}
                <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="rounded-xl"
                >
                    <a
                        href={href}
                        download={fileName}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Download className="size-4" />
                    </a>
                </Button>

            </div>
        </Card>
    );
};