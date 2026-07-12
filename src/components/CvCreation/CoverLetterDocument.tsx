import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CoverLetterDocumentProps } from "../../types/cv_template";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    fontSize: 10.5,
    color: "#333333",
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 20,
    borderBottom: "1px solid #cccccc",
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a202c",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitle: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
    color: "#4a5568",
    fontSize: 9,
  },
  date: {
    marginTop: 15,
    marginBottom: 15,
    color: "#4a5568",
    fontWeight: "bold",
  },
  body: {
    marginTop: 10,
  },
  paragraph: {
    marginBottom: 14,
    textAlign: "justify",
  },
});

export const CoverLetterDocument = ({
  cv,
  coverLetterText,
}: CoverLetterDocumentProps) => {
  // Format current date: July 11, 2026
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Split paragraphs by one or more newlines, trim content, and filter out empty items
  const paragraphs = coverLetterText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{cv.full_name}</Text>
          <View style={styles.subtitle}>
            <Text>{cv.email}</Text>
            {cv.phone && <Text>| {cv.phone}</Text>}
            {cv.links?.map((link, idx) => (
              <Text key={idx}>| {link}</Text>
            ))}
          </View>
        </View>

        {/* Date */}
        <Text style={styles.date}>{formattedDate}</Text>

        {/* Paragraphs */}
        <View style={styles.body}>
          {paragraphs.map((p, idx) => (
            <Text key={idx} style={styles.paragraph}>
              {p}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};
