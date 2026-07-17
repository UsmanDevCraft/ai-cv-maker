import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
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
  linkText: {
    color: "#1e40af",
    fontSize: 9,
    textDecoration: "underline",
  },
  linksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
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
            <Link src={`mailto:${cv.email}`} style={styles.linkText}>
              {cv.email}
            </Link>
            {cv.phone && <Text>| {cv.phone}</Text>}
          </View>
          {cv.links && cv.links.length > 0 && (
            <View style={styles.linksRow}>
              {cv.links.map((link, idx) => {
                const label = link.text || link.url || link.type;
                const href = link.url;
                return (
                  <View key={idx} style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 9, color: "#4a5568" }}>| </Text>
                    {href ? (
                      <Link src={href} style={styles.linkText}>
                        {label}
                      </Link>
                    ) : (
                      <Text style={{ fontSize: 9, color: "#4a5568" }}>
                        {label}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          )}
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
