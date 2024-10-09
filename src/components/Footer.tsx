import Container from '@/components/Container';

const Footer = () => {
  return (
    <footer className="mt-12 mb-8">
      <Container className="flex justify-between gap-4">
        <p className="text-sm">
          Invoicipedia &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm">
          Created by Wira with Next.js, PostgresQL, and Clerk
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
