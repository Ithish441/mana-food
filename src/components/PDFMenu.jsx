import React, { useState, useRef, useEffect, useCallback } from 'react';
import { pdfjs, Document, Page as ReactPdfPage } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// A single page — forwardRef required by react-pageflip
const BookPage = React.forwardRef(({ pageNumber, width, height }, ref) => (
  <div
    ref={ref}
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: '#faf8f2',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
    }}
  >
    <ReactPdfPage
      pageNumber={pageNumber}
      width={width}
      renderTextLayer={false}
      renderAnnotationLayer={false}
    />
  </div>
));
BookPage.displayName = 'BookPage';

// A blank right-side page for when numPages is odd
const BlankPage = React.forwardRef(({ width, height }, ref) => (
  <div
    ref={ref}
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: '#faf8f2',
    }}
  />
));
BlankPage.displayName = 'BlankPage';

const PDFMenu = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageSize, setPageSize] = useState({ width: 400, height: 566 });
  const [currentPage, setCurrentPage] = useState(0);
  const wrapperRef = useRef(null);
  const bookRef = useRef(null);

  const calcSize = useCallback(() => {
    if (!wrapperRef.current) return;
    const w = wrapperRef.current.offsetWidth;
    const isMobile = w < 600;
    // Mobile: full width single page; Desktop: split two-page spread
    const pageW = isMobile
      ? Math.min(w - 16, 480)
      : Math.min(Math.floor(w / 2) - 8, 480);
    const pageH = Math.floor(pageW * 1.414); // A4 ratio
    setPageSize({ width: pageW, height: pageH, isMobile });
  }, []);

  useEffect(() => {
    calcSize();
    window.addEventListener('resize', calcSize);
    return () => window.removeEventListener('resize', calcSize);
  }, [calcSize]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(0);
  };

  const onFlip = (e) => setCurrentPage(e.data);

  const goToPrev = () => bookRef.current?.pageFlip().flipPrev();
  const goToNext = () => bookRef.current?.pageFlip().flipNext();

  // Pad odd page counts so the book always has even pages (proper spread)
  const paddedPages = numPages
    ? numPages % 2 !== 0 ? numPages + 1 : numPages
    : 0;

  const isFirst = currentPage === 0;
  const isLast = numPages ? currentPage >= numPages - 2 : true;

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}
    >
      {/* Book stage */}
      <div
        style={{
          width: pageSize.isMobile ? `${pageSize.width}px` : `${pageSize.width * 2}px`,
          height: `${pageSize.height}px`,
          maxWidth: '100%',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div style={{ width: '100%', height: `${pageSize.height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#5A5650', letterSpacing: '2px' }}>
              Loading menu…
            </div>
          }
          error={
            <div style={{ width: '100%', height: `${pageSize.height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A44633', fontFamily: 'sans-serif' }}>
              Could not load PDF.
            </div>
          }
        >
          {numPages && pageSize.width > 0 && (
            <HTMLFlipBook
              ref={bookRef}
              width={pageSize.width}
              height={pageSize.height}
              size="fixed"
              minWidth={pageSize.width}
              maxWidth={pageSize.width}
              minHeight={pageSize.height}
              maxHeight={pageSize.height}
              showCover={true}
              drawShadow={true}
              flippingTime={700}
              usePortrait={!!pageSize.isMobile}
              startPage={0}
              autoSize={false}
              maxShadowOpacity={0.5}
              mobileScrollSupport={true}
              onFlip={onFlip}
              style={{ boxShadow: '0 30px 80px rgba(30,27,24,0.25)' }}
            >
              {Array.from({ length: paddedPages }, (_, i) => {
                if (i < numPages) {
                  return (
                    <BookPage
                      key={i}
                      pageNumber={i + 1}
                      width={pageSize.width}
                      height={pageSize.height}
                    />
                  );
                }
                // Blank filler for odd page counts
                return <BlankPage key={i} width={pageSize.width} height={pageSize.height} />;
              })}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      {/* Navigation */}
      {numPages && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button
            onClick={goToPrev}
            disabled={isFirst}
            aria-label="Previous page"
            style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '1px solid #1E1B18', background: 'none',
              fontSize: '1.4rem', color: '#1E1B18',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: isFirst ? 0.25 : 1,
              cursor: isFirst ? 'default' : 'pointer',
              transition: 'all 0.25s ease',
            }}
          >‹</button>

          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.9rem', color: '#5A5650', letterSpacing: '1px' }}>
            {pageSize.isMobile
              ? `${Math.min(currentPage + 1, numPages)} / ${numPages}`
              : `${Math.min(currentPage + 1, numPages)} – ${Math.min(currentPage + 2, numPages)} \u00a0/\u00a0 ${numPages}`
            }
          </span>

          <button
            onClick={goToNext}
            disabled={isLast}
            aria-label="Next page"
            style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '1px solid #1E1B18', background: 'none',
              fontSize: '1.4rem', color: '#1E1B18',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: isLast ? 0.25 : 1,
              cursor: isLast ? 'default' : 'pointer',
              transition: 'all 0.25s ease',
            }}
          >›</button>
        </div>
      )}

      <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '0.8rem', color: '#aaa9a5', letterSpacing: '1px' }}>
        Click the page edges or use ‹ › to browse
      </p>
    </div>
  );
};

export default PDFMenu;
