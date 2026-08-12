import { z } from "zod";

export const reportSchema = z.object({
  status: z.enum(["PENDING", "REVIEWED", "RESOLVED", "REJECTED"]),
  adminNote: z.string().max(1000).optional(),
});

// id String @id @default(cuid())

// lyricId Int  @map("lyric_id") @db.UnsignedInt
// userId  Int? @map("user_id") @db.UnsignedInt

// type    LyricReportType
// message String          @db.Text

// status LyricReportStatus @default(PENDING)

// reviewedAt DateTime? @map("reviewed_at")
// reviewedBy Int?      @map("reviewed_by") @db.UnsignedInt
// adminNote  String?   @map("admin_note") @db.Text

// createdAt DateTime @default(now()) @map("created_at")
// updatedAt DateTime @updatedAt @map("updated_at")

// lyric    Lyric @relation(fields: [lyricId], references: [id], onDelete: Cascade)
// user     User? @relation("LyricReportReporter", fields: [userId], references: [id], onDelete: SetNull)
// reviewer User? @relation("LyricReportReviewer", fields: [reviewedBy], references: [id], onDelete: SetNull)
